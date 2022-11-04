import { logout } from "../global/logout.js";

import { getInfosLogedUser } from "../global/requests.js";
import { verify } from "../global/verifyLocalStorage.js";
import { renderCompanyAndDepartName, renderCoworkers, renderUserInfos } from "./renderDashUsers.js";

verify()
logout()
renderUserInfos()
renderCoworkers()
renderCompanyAndDepartName()