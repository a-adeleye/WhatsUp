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

export const getListById = (listId: string, filter?: string): object => {
    return sp.web.lists.getById(listId).items.filter(filter)()
        .then((response) => {
            console.log(response)
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export const addItem = async (listTitle: string, data: any): Promise<any> => {
    return await sp.web.lists.getByTitle(listTitle).items.add(data);
}

export const updateItem = async (listTitle: string, itemId: number, data: any): Promise<any> => {
    const list = await sp.web.lists.getByTitle(listTitle);
    return await list.items.getById(itemId).update(data);
};

export const getParameterFromURL = (parameter: string): string => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(new URL(currentUrl).search);
    return searchParams.get(parameter);
}

export const getSiteUsers = (): any => {

    return sp.web.siteUsers()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

export const formattedDate = (date: string): string => {
    return new Date(date).toISOString().split('T')[0];
}

export const formattedDateAndTime = (date: string): string => {
    const dateObj = new Date(date);
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
    })}`;
}

export const getItemObject = (data: any, id?: any): object => {
    return data.find((item: any) => item.Id === +id);
}

export const getItemsObject = (ids: number[], data: any[]): any[] => {
    if (!ids) {
        return [];
    }
    return data.filter(obj => ids.includes(obj.Id));
};

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

export const futureDate = (numberOfDays: number): string => {
    const today = new Date();
    return new Date(today.getTime() + numberOfDays * 24 * 60 * 60 * 1000).toISOString();
}

export const TASKLIST = [
    {
        "SNo": 1,
        "Title": "Line manager onboarding form",
        "Duedate": futureDate(1),
        "Status": 'Not started',
        "Taskgroup": "Pre-Onboarding"
    },
    {
        "SNo": 2,
        "Title": "Prepare Office/Seat Allocation",
        "Duedate": futureDate(1),
        "Status": 'Not started',
        "Taskgroup": "Pre-Onboarding"
    },
    {
        "SNo": 3,
        "Title": "Prepare Email Account",
        "Duedate": futureDate(1),
        "Status": 'Not started',
        "Taskgroup": "Pre-Onboarding"
    },
    {"SNo": 4, "Title": "Jlinx", "Duedate": futureDate(1), "Status": 'Not started', "Taskgroup": "Pre-Onboarding"},
    {
        "SNo": 5,
        "Title": "Welcome Email",
        "Duedate": futureDate(1),
        "Status": 'Not started',
        "Taskgroup": "Pre-Onboarding"
    },
    {"SNo": 6, "Title": "Welcome KIT", "Duedate": futureDate(1), "Status": 'Not started', "Taskgroup": "Onboarding"},
    {
        "SNo": 7,
        "Title": "Employment Contract & Visa/Labour Permit",
        "Duedate": futureDate(10),
        "Status": 'Not started',
        "Taskgroup": "Onboarding"
    },
    {
        "SNo": 8,
        "Title": "NDA, Privacy Statement & Signed Original Offer Letter",
        "Duedate": futureDate(10),
        "Status": 'Not started', "Taskgroup": "Onboarding"
    },
    {
        "SNo": 9,
        "Title": "Health Insurance",
        "Duedate": futureDate(1),
        "Status": 'Not started',
        "Taskgroup": "Onboarding"
    },
    {"SNo": 10, "Title": "Sim Card", "Duedate": futureDate(1), "Status": 'Not started', "Taskgroup": "Onboarding"},
]

export const DEVICES = [
    "Laptop",
    "Mobile",
]

export const showToast = (type: string, title: string, message: string, setter: any): void => {
    setter({
        type: type,
        title: title,
        message: message
    })
}
