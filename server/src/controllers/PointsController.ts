import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: 'https://cdn.vox-cdn.com/thumbor/OUZTjdeVMpFyu5C9q9Mph8Kwbc0=/0x0:1440x958/1200x800/filters:focal(487x355:717x585)/cdn.vox-cdn.com/uploads/chorus_image/image/66582541/90243227_2318698448428419_8002924244671397888_o.0.jpg',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx("points").insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({ id: point_id, ...point })
    }


    async index(request: Request, response: Response) {
        const {city, uf, items} = request.query

        const parseItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex("points")
            .join("point_items", "points.id", "=", "point_items.point_id")
            .whereIn('point_items.item_id', parseItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select("points.*");

        return response.json(points);

    }

    async show(request: Request, response: Response) {
        const {id} = request.params;
        
        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message:'Point not found.'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select("items.title");

        return response.json({point, items});
    }
}

export default PointsController;