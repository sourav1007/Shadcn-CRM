import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, Plus, ChevronDown,List,Kanban,Download, ChevronUp ,Upload,} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Switch } from "@/components/ui/switch"

const TableHeaderControls = (props) => {
  const [showRoles, setShowRoles] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [roleName, setRoleName] = useState("")
  const [permissions, setPermissions] = useState({})

  const [roles] = useState([
    "Accountant",
    "Sales Manager",
    "Sales Executive",
    "Manager",
    "Marketing Manager",
  ])

  // Dummy permission structure for demonstration
  const permissionsData = {
    Users: {
      "Manage Users": ["View", "Edit", "Delete"],
      "Invite Users": ["Send"],
    },
    Reports: {
      "Sales Report": ["View", "Export"],
      "Activity Log": ["View"],
    },
  }

  const handleSelect = (role) => {
    setSelectedRole(role)
    setShowRoles(false)
  }

  const handleToggle = (section, item, action) => {
    const key = `${section}.${item}.${action}`
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
    const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold text-gray-900">{props.title}</h2>
      

      <div className="flex items-center gap-2.5">
        {props.title === "User" && (
          <Dialog>
            <DialogTrigger>
              <button className="px-4 py-2 bg-green-900 text-white rounded flex items-center gap-1">
                <UserPlus size={16} />
                Add New User
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <form className="mt-4 space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Assign Role</label>
                  <div
                    className="w-full border px-3 py-2 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => setShowRoles(!showRoles)}
                  >
                    <span className={selectedRole ? "text-black" : "text-gray-400"}>
                      {selectedRole || "Select role"}
                    </span>
                    {showRoles ? (
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </div>

                  {showRoles && (
                    <div className="mt-1 border rounded shadow-md bg-white">
                      {roles.map((role) => (
                        <div
                          key={role}
                          onClick={() => handleSelect(role)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <DialogClose asChild>
                    <button  className="px-4 py-2 bg-gray-200 text-green-900 rounded">
                      Cancel
                    </button>
                  </DialogClose>
                  <button type="submit" className="px-4 py-2 bg-green-900 text-white rounded">
                    Send Invite
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {props.title === "Role" && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 bg-green-900 text-white rounded">
                <Plus className="w-5 h-5" />
                Add New Role
              </button>
            </DialogTrigger>
            <DialogContent className="role-dialog">
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>

              <form className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role Name*</label>
                  <input
                    type="text"
                    placeholder="Enter role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                {Object.entries(permissionsData).map(([section, items]) => (
                  <div key={section} className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">{section}</h4>
                    {Object.entries(items).map(([item, actions]) => (
                      <div key={item} className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-gray-800">{item}</div>
                        <div className="flex gap-4 flex-wrap items-center">
                          {actions.map((action) => {
                            const key = `${section}.${item}.${action}`
                            return (
                              <div key={action} className="flex items-center gap-2">
                                <span className="text-sm">{action}</span>
                                <Switch
                                  checked={!!permissions[key]}
                                  onCheckedChange={() => handleToggle(section, item, action)}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex justify-end gap-2 mt-6">
                  <DialogClose asChild>
                    <button type="button" className="px-4 py-2 bg-gray-200 text-green-800 rounded">
                      Cancel
                    </button>
                  </DialogClose>
                  <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
                    Save
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}

        {props.title === "Leads" && (
          <div className="flex items-center gap-2.5">
                <div className="view-switches flex bg-[#F1F5F9] p-1 rounded-md">
                    <Button onClick={() => {
                      console.log("list view clicked")
                        props.setActiveTab("tab1")
                    }} className={`rounded-md py-1.5 px-3 flex items-center gap-1
                    ${props.activeTab === "tab1" ? "border bg-[#FFFFFF] text-[#105427] hover:bg-[none]  border-[#E2E8F0] rounded-md  py-1.5 px-3" : "outline-none border-none bg-transparent shadow-none hover:bg-[none] text-[#105427]"}`}>
                        <List className="h-4 w-4" />
                        List View
                    </Button>
                    <Button onClick={() => {
                      console.log("Kanban view clicked")
                        props.setActiveTab("tab2")
                    }} className={`rounded-md py-1.5 px-3 flex items-center gap-1
                    ${props.activeTab === "tab2" ? "border bg-[#FFFFFF] text-[#105427] hover:bg-[none]  border-[#E2E8F0] rounded-md  py-1.5 px-3" : "outline-none border-none bg-transparent shadow-none hover:bg-[none] text-[#105427]"}`}>
                        <Kanban />

                        Kanban View
                    </Button>
                </div>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="  text-[#105427] py-2 px-3 border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] ">
                            <Upload className="h-4 w-4" />
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                        <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Import Button */}
                <Button className="text-[#105427] bg-[#F1F5F9] py-2 px-3 hover:bg-amber-50">
                    <Download className="h-4 w-4" />
                    Import Leads
                </Button>

                {/* Add Leads */}
                <Dialog >
                        <DialogTrigger>
                          <button className="px-4 py-2 bg-green-900 text-white rounded flex items-center gap-1">
                            <Plus size={16} />
                            Add Lead
                          </button>
                        </DialogTrigger>
                        <DialogContent className=" lead">
                          <DialogHeader>
                            <DialogTitle>Add New Lead</DialogTitle>
                            <DialogTitle>Lead Information</DialogTitle>
                            <form className="mt-4 space-y-4">
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Lead Name*
                                </label>
                                <input
                                  id="leadname"
                                  type="text"
                                  placeholder="Enter value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <label htmlFor="username" className="block text-sm font-medium mb-1">
                                Description*
                                <div className="char-count">{description.length}/100</div>
                                <input
                                  maxLength={100}
                                  id="description"
                                  placeholder="Type your message here"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                
                              </label>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Vendor Name*
                                </label>
                                <input
                                  id="vendorname"
                                  type="text"
                                  placeholder="Select vendor"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Contact Person
                                </label>
                                <input
                                  id="contact"
                                  type="text"
                                  placeholder="Select Contact"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Email Address*
                                </label>
                                <input
                                  id="email"
                                  type="text"
                                  placeholder="Enter email"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Mobile Number*
                                </label>
                                <input
                                  id="mobileNo"
                                  type="text"
                                  placeholder="Enter mobile number"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Lead Stage*
                                </label>
                                <input
                                  id="Lead"
                                  type="text"
                                  placeholder="Initial"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Website
                                </label>
                                <input
                                  id="Website"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <DialogTitle>Address Information</DialogTitle>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Street
                                </label>
                                <input
                                  id="street"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  City
                                </label>
                                <input
                                  id="city"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  District
                                </label>
                                <input
                                  id="district"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  State
                                </label>
                                <input
                                  id="state"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Country
                                </label>
                                <input
                                  id="country"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                
                
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Zipcode
                                </label>
                                <input
                                  id="zipcode"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <DialogTitle>Additional Information</DialogTitle>
                
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Lead Owner*
                                </label>
                                <input
                                  id="leadOwner"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Tags
                                </label>
                                <input
                                  id="tags"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Expected Close Date
                                </label>
                                <input
                                  id="date"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Lead Source
                                </label>
                                <input
                                  id="leadSource"
                                  type="text"
                                  placeholder="Enter Value"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <DialogTitle>Associated Products</DialogTitle>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Products
                                </label>
                                <input
                                  id="Products"
                                  type="text"
                                  placeholder="Select Product"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Quantity
                                </label>
                                <input
                                  id="Products"
                                  type="text"
                                  placeholder="Select Product"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                              <DialogTitle>Associated Services</DialogTitle>
                              <div>
                                <label htmlFor="username" className="block text-sm font-medium mb-1">
                                  Service
                
                                </label>
                                <input
                                  id="Service"
                                  type="text"
                                  placeholder="Select Product"
                                  className="w-full border px-3 py-2 rounded"
                                  required
                                />
                              </div>
                
                
                              <div className="flex justify-end gap-2 mt-4 ">
                                <button
                                  type="button"
                                  onClick={() => setShowModal(true)}
                                  className="px-4 py-2 bg-white border border-green-900 text-green-900 rounded"
                                >
                                  Customize Fields
                                </button>
                
                                {showModal && <CustomizeFieldsModal onClose={() => setShowModal(false)} />
                
                                }
                                <DialogClose asChild>
                                  <button type="button" className="px-4 py-2 bg-gray-200 text-green-900 rounded">
                                    Cancel
                                  </button>
                                </DialogClose>
                                <button type="submit" className="px-4 py-2 bg-green-900 text-white rounded">
                                  Save
                                </button>
                              </div>
                            </form>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                
            </div>
            
        )}
      </div>
    </div>
  )
}

export default TableHeaderControls
