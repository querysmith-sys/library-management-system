import { Booktable } from "../booktable";
import AdminLayout from "../adminLayout";
function ClerkManagementPage() {
     return (
        <AdminLayout> 
            <h1>Clerk Management Page</h1>
            <Booktable/>
        </AdminLayout>
     )
}

export default ClerkManagementPage;