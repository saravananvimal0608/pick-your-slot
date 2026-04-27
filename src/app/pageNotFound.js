import { redirect } from "next/navigation";


const pageNotFound = () => {
 redirect("/404");
}

export default pageNotFound;