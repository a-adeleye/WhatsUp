import {SPBrowser, spfi} from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";


const baseUrl = "https://jetexfs.sharepoint.com/sites/WhatsUp/";

const sp = spfi().using(SPBrowser({baseUrl: baseUrl}));

export const getListByTitle = (listTitle: string): Promise<any> => {
    return sp.web.lists.getByTitle(listTitle).items()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

export const extractImageUrl = (jsonString: string) => {
    if (!jsonString) {
        return "https://jetexfs.sharepoint.com/sites/appcatalog/ClientSideAssets/1797d7dc-68cf-4b05-9b0f-0a4479138be2/default_user_d8a851d076dd2b17d3205b86c61019f9.jpg";
    }
    const data = JSON.parse(jsonString);
    return data.serverRelativeUrl;
}

export const getListItemsByTitle = (listTitle: string, filter?: string): Promise<any> => {
    if (filter) {
        return sp.web.lists.getByTitle(listTitle).items.filter(filter)()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
    return sp.web.lists.getByTitle(listTitle).items()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

export const addItem = async (listTitle: string, data: any): Promise<any> => {
    return await sp.web.lists.getByTitle(listTitle).items.add(data);
}

export const currentUSer = async (): Promise<any> => {
    return sp.web.currentUser()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

