import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DatabaseStatus, IDatabaseClient } from "../database";

export default class HeroesController {
  public router = express.Router();
  private readonly client;

  constructor(client: IDatabaseClient) {
    this.client = client;
    this.initialiseRoute();
  }

  private initialiseRoute() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    HeroPayload:
     *      type: object
     *      require:
     *        - name
     *      properties:
     *        name:
     *          type: string
     *          description: The name of the hero
     *      example:
     *        name: Iron Man
     *    Hero:
     *      allOf:
     *        - { $ref: '#/components/schemas/HeroPayload' }
     *        - type: object
     *          properties:
     *            id:
     *              type: string
     *              description: The auto generated id of the hero
     *          example:
     *            id: d5hsd83
     */

    /**
     * @swagger
     * /heroes:
     *  get:
     *    summary: Returns the list of all heroes
     *    responses:
     *      200:
     *        description: The list of the heroes
     *        content:
     *          applications/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Hero'
     */
    this.router.get("/", this.getHeroes);

    /**
     * @swagger
     * /heroes:
     *  post:
     *    summary: Add a new hero
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/HeroPayload'
     *    responses:
     *      200:
     *        description: The hero was created
     *      500:
     *        description: Server error
     */
    this.router.post("/", this.createHero);

    /**
     * @swagger
     * /heroes/{id}:
     *  delete:
     *    summary: Delete a hero from the list
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The hero id
     *    responses:
     *      200:
     *        description: The hero was deleted
     */
    this.router.delete("/:id", this.deleteHero);
  }

  private getHeroes = async (_: Request, res: Response) => {
    try {
      const heroes = await this.client.getHeroes();
      res.json(heroes);
    } catch (error) {
      let message = "Can't fetch heroes";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };

  private createHero = async (req: Request, res: Response) => {
    const hero = req.body?.name;

    if (!hero) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: "Missing name in body" });
      return;
    }

    try {
      const result = await this.client.createHero(hero);

      if (result === DatabaseStatus.Exist) {
        res
          .status(StatusCodes.CONFLICT)
          .json({ message: `${hero} already exist` });
        return;
      }
      res.status(StatusCodes.CREATED).json({ id: result });
    } catch (error) {
      let message = `Can't create hero ${hero}`;
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(StatusCodes.BAD_REQUEST).json({ message });
    }
  };

  private deleteHero = async (req: Request, res: Response) => {
    const hero = req.params.id;

    try {
      await this.client.deleteHero(hero);
      res.status(StatusCodes.OK).json({ message: `Removed hero ${hero}` });
    } catch (error) {
      let message = `Can't delete hero ${hero}`;
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
}
