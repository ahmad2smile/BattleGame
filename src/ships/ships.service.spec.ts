import { ShipLength } from "./models/ShipLength";
import { Ship } from "./ship.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { ShipsService } from "./ships.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ShipType } from "./models/ShipType";
import { Orientation } from "./models/Orientation";

describe("ShipsService", () => {
	let service: ShipsService;

	const ship = new Ship();
	ship.id = 1;
	ship.damage = 100;
	ship.type = ShipType.Battleship;
	ship.orientation = Orientation.Vertical;
	ship.start = 1;
	ship.end = ship.start + ShipLength[ShipType.Battleship];

	let mockRepository = {
		findOne: () => ship,
		save: (_ship: Ship) => _ship,
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ShipsService,
				{
					provide: getRepositoryToken(Ship),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<ShipsService>(ShipsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("Ship", () => {
		let newShip: Ship;

		beforeEach(async () => {
			newShip = await service.find(1);
		});

		it("Should return the Ship with id 1", () => {
			expect(newShip.id).toBe(1);
		});

		it("Should return the Ship with Orientation Horizontal", () => {
			expect(newShip.orientation).toBe(Orientation.Vertical);
		});

		it("Should return Saved Ship with id 1", async () => {
			const savedShip = await service.add(newShip);
			expect(savedShip.id).toBe(1);
		});

		it("Should return Saved Ship with playerRole Attacker", async () => {
			const savedShip = await service.add(newShip);

			expect(savedShip.orientation).toBe(Orientation.Vertical);
		});

		it("Should have Cords 1, 11, 21, 31", () => {
			const shipCords = service.getShipCords(newShip);

			expect(shipCords[0]).toBe(1);
			expect(shipCords[1]).toBe(11);
			expect(shipCords[2]).toBe(21);
			expect(shipCords[3]).toBe(31);
		});
	});

	describe("Get Random Ships", () => {
		let randomShips: Ship[];

		beforeAll(async () => {
			randomShips = service.getRandomShips();
		});

		it("Should have total 7 ships", () => {
			expect(randomShips.length).toBe(10);
		});

		it("Should have total 1 Battleship", () => {
			expect(
				randomShips.filter(s => s.type === ShipType.Battleship).length,
			).toBe(1);
		});

		it("Should have total 2 Cruiser", () => {
			expect(
				randomShips.filter(s => s.type === ShipType.Cruiser).length,
			).toBe(2);
		});

		it("Should have total 3 Destroyer", () => {
			expect(
				randomShips.filter(s => s.type === ShipType.Destroyer).length,
			).toBe(3);
		});

		it("Should have total 4 Submarine", () => {
			expect(
				randomShips.filter(s => s.type === ShipType.Submarine).length,
			).toBe(4);
		});

		it("Should not have any ship start at 0", () => {
			expect(randomShips.every(s => s.start !== 0)).toBe(true);
		});

		it("Should not have any ship end after 100", () => {
			expect(randomShips.every(s => s.end < 101)).toBe(true);
		});
	});
});
