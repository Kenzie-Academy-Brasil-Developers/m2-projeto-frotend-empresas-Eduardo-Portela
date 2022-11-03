import { logout } from "../global/logout.js";
import { getInfosLogedUser } from "../global/requests.js";
import { verify } from "../global/verifyLocalStorage.js";
import { renderUserInfos } from "./renderDashUsers.js";

console.log(await getInfosLogedUser())
verify()
logout()
renderUserInfos()
