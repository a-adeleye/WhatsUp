import { SPBrowser, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/folders";
import "@pnp/sp/files";


const baseUrl = "https://jetexfs.sharepoint.com/sites/WhatsUp/";

const sp = spfi().using(SPBrowser({ baseUrl: baseUrl }));

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

export const getOrderedListItemsByTitle = (listTitle: string, orderBy?: string, filter?: string): Promise<any> => {
    return sp.web.lists.getByTitle(listTitle).items.filter(filter).orderBy(orderBy)()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

export const getLibraryFilesByPath = (folderRelativeUrl: string): Promise<any> => {
    const normalized = folderRelativeUrl.startsWith("/")
        ? folderRelativeUrl
        : `/sites/WhatsUp/${folderRelativeUrl}`;

    return sp.web.getFolderByServerRelativePath(normalized).files
        .select("*,ServerRelativeUrl,EncodedAbsUrl,ServerRedirectedEmbedUrl,LinkingUrl")()
        .then((response: any) => response)
        .catch((error: any) => {
            console.log(error);
            throw error;
        });
};

export const getLibraryItemsWithMetadata = (libraryTitle: string, filter?: string): Promise<any> => {
    const query = sp.web.lists.getByTitle(libraryTitle).items
        .select("*", "FileRef", "EncodedAbsUrl", "FileLeafRef", "File/ServerRelativeUrl")
        .expand("File");

    const finalQuery = filter ? query.filter(filter) : query;

    return finalQuery()
        .then((response) => response)
        .catch((error) => {
            console.log("Error fetching library items with metadata:", error);
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
