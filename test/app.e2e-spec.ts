import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as superRequest from "supertest";
import { AppModule } from "./../src/app.module";

jest.setTimeout(30000);

describe("AppController (e2e)", () => {
	let request: superRequest.SuperTest<superRequest.Test>;
	let game;
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		request = superRequest(app.getHttpServer());
		const response = await request.post("/games").send({
			playerRole: "Defender",
		});

		game = response.body;
	});

	it("Game in Progress", () => {
		expect(game.gameStatus).toBe("InProgress");
	});

	it("Place 1 Battleship", async done => {
		const response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 31,
			orientation: "Horizontal",
			type: "Battleship",
		});

		expect(response.ok).toBe(true);

		return done();
	});

	it("Place 2 Cruiser", async done => {
		let response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 52,
			orientation: "Vertical",
			type: "Cruiser",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 55,
			orientation: "Horizontal",
			type: "Cruiser",
		});

		expect(response.ok).toBe(true);

		return done();
	});

	it("Place 3 Destroyer", async done => {
		let response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 90,
			orientation: "Vertical",
			type: "Destroyer",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 94,
			orientation: "Horizontal",
			type: "Destroyer",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 86,
			orientation: "Horizontal",
			type: "Destroyer",
		});

		expect(response.ok).toBe(true);

		return done();
	});

	it("Place 4 Submarine", async done => {
		let response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 9,
			orientation: "Horizontal",
			type: "Submarine",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 27,
			orientation: "Horizontal",
			type: "Submarine",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 14,
			orientation: "Horizontal",
			type: "Submarine",
		});

		expect(response.ok).toBe(true);

		response = await request.post("/games/place-ship").send({
			gameId: game.id,
			start: 48,
			orientation: "Horizontal",
			type: "Submarine",
		});

		expect(response.ok).toBe(true);

		return done();
	});

	it("Attack All Ships", async done => {
		const shipCords = [
			31,
			32,
			33,
			34,
			52,
			62,
			72,
			55,
			56,
			57,
			90,
			100,
			94,
			95,
			86,
			87,
			9,
			10,
			11,
			27,
			28,
			29,
			14,
			15,
			16,
			48,
			49,
			50,
		];

		const requests = shipCords.map(p =>
			request.post("/attacks").send({
				gameId: game.id,
				position: p,
			}),
		);

		const responses = await Promise.all(requests);

		responses.forEach(r => {
			expect(r.body.result !== "Miss").toBeTruthy();
		});

		return done();
	});

	it("The Game has been WON!", async done => {
		const response = await request.get(`/games?id=${game.id}`);

		const status = response.body;
		expect(status.gameStatus).toBe("Won");

		return done();
	});
});
