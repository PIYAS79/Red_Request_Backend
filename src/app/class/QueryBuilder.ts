import { FilterQuery, Query, model } from "mongoose";


class Query_Builder<T>{
    public query: Record<string, unknown>;
    public modelQuery: Query<T[], T>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>,) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    searchQuery(partialSearchTags: string[]) {
        if (this.query?.search) {
            this.modelQuery = this.modelQuery.find({
                $or: partialSearchTags.map(one => ({
                    [one]: { $regex: this.query?.search, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }
        return this;
    }

    filterQuery() {
        const exactTags = { ...this.query };
        const exceptTags = ['search', 'limit', 'page', 'skip', 'select', 'sort'];
        exceptTags.forEach(one => delete exactTags[one]);
        this.modelQuery = this.modelQuery.find(exactTags as FilterQuery<T>);
        return this;
    }

    sortQuery() {
        const sort = this.query?.sort || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }

    pageQuery() {
        const limit = Number(this.query?.limit) || 10;
        const page = Number(this.query?.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    fieldQuery() {
        const select = (this.query?.select as string)?.split(',').join(' ') || '';
        this.modelQuery = this.modelQuery.select(select);
        return this;
    }

    async countTotalMeta() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const totalPage = Math.ceil(total / limit);
        return {
            page, limit, total, totalPage
        }
    }
}

export default Query_Builder;