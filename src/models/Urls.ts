import { Knex } from "../config/config";
const KnexConfig = Knex.config;
import { Exclude, Transform } from 'class-transformer';


export interface UrlInstance {
    id?: number;
    short_id: string;
    original_url: string;
    created_at?: Date;
    updated_at?: Date;
    toJSON?: () => Omit<UrlInstance, 'updated_at'>;
}

const knexInstance = require('knex')(KnexConfig);
// import * as knex from 'knex';
// const knexInstance = knex(KnexConfig);

class Url {
    private knex: any;

    constructor(knex: any) {
        this.knex = knex;
    }

    @Transform(({ value }) => value.toJSON(), { toClassOnly: true })
    public async getUrlById(id: number, transform: boolean = true): Promise<UrlInstance> {
        const Url = await this.knex("Url").where("id", id).first();

        if (transform) {
            return Url;
        }

        return this.transformUrl(Url)
    }

    public async addUrl(Url: UrlInstance):
    Promise<any> {
        const saveUrl = await this.knex("Url").insert(Url);
        const getUrl = this.getUrlById(saveUrl[0]);
        return getUrl;
    }

    public async updateUrl(id: number, Url: UrlInstance):
    Promise<any> {
        return await this.knex('Url').where('id', id).update(Url);
    }

    public async getUrlBySlug(slug: string):
    Promise<any> {
        return await this.knex('Url').where("short_id", slug).first();
    }

    private transformUrl(Url: UrlInstance): UrlInstance {
        return {
          ...Url,
          toJSON: () => ({
            ...Url,
          }),
        };
      }
}

let UrlQueries = new Url(knexInstance)
export default UrlQueries;

