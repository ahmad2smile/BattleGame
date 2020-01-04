interface PromiseToResolve<T> {
	resolve: (payload: T) => void;
	reject: (payload: Error) => void;
}

export function Queue<C, T, R>(predicate: (a: T, b: T) => boolean) {
	return (target: object, key: string, descriptor: PropertyDescriptor) => {
		const original = descriptor.value;

		const queued: Array<{
			entity: T;
			promiseToResolve: PromiseToResolve<R>;
		}> = [];

		let inProgress: Array<{
			entity: T;
			promiseToResolve: PromiseToResolve<R>;
		}> = [];

		let context: C;

		const caller = async function(
			entity: T,
			resolve: (payload: R) => void,
			reject: (error: Error) => void,
		) {
			if (!context) {
				context = this;
			}

			if (inProgress.some(a => predicate(a.entity, entity))) {
				queued.push({
					entity,
					promiseToResolve: { resolve, reject },
				});
			} else {
				inProgress.unshift({
					entity,
					promiseToResolve: { resolve, reject },
				});

				try {
					const result = await original.apply(context, [
						entity,
						resolve,
						reject,
					]);

					resolve(result);

					inProgress = inProgress.filter(
						a => !predicate(a.entity, entity),
					);

					const firstQueued = queued.pop();

					if (firstQueued) {
						caller(
							firstQueued.entity,
							firstQueued.promiseToResolve.resolve,
							firstQueued.promiseToResolve.reject,
						);
					}
				} catch (error) {
					reject(error);
				}
			}
		};

		descriptor.value = caller;
		return descriptor;
	};
}
