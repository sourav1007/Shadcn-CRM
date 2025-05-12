"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,

  DialogClose,
} from "@/components/ui/dialog"
import { UserPlus, Trash2, ChevronDown, Plus, X, GripVertical, ChevronUp, Columns3Cog } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import { Input } from '@/components/ui/input';



const permissionsData = {
  "Basic Permissions": {
    "List Records":
      ["View", "Create", "Edit", "Delete"],
    "Contacts":
      ["View", "Create", "Edit", "Delete"],
    "Vendors": ["View", "Create", "Edit", "Delete"],
    "Products": ["View", "Create", "Edit", "Delete"],
    "Dashboards": ["View", "Manage"],
  },
  "Advanced Features": {
    Automation: [""],
    "User Management": [""],
  },
}

const Page = () => {
  const [showRoles, setShowRoles] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [roles] = useState([
    "Accountant",
    "Sales Manager",
    "Sales Executive",
    "Manager",
    "Marketing Manager",
  ])

  const [leadInfo, setLeadInfo] = useState([
    "Name",
    "LastName",
    "Email",
    "Mobile No",
    "Contact Person"
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [roleName, setRoleName] = useState("")
  const [permissions, setPermissions] = useState({})
  const [title, setTitle] = useState("")
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [host, setHost] = useState("Dipanshu Singh");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState([
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    { name: "Akash Singh", email: "akash.singh.kumar@webninjaz.com" },
    // ... more participants
  ]);
  const [reminder, setReminder] = useState(false);
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

  const toggleParticipant = (email: string) => {
    setSelectedParticipants([email]);
  };


  const handleDelete = () => {
    console.log("User deleted!")
    setShowDeleteModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const meetingDetails = {
      title,
      from: `${fromDate} ${fromTime}`,
      to: `${toDate} ${toTime}`,
      allDay,
      host,
      description,
    }
    console.log("Meeting submitted:", meetingDetails)
  }

  return (
    <div className="p-6 space-y-4">

      {/* Add User Modal */}
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
                    <ChevronUp className="w-4 h-4 text-gray-600 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600 transition-transform" />
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
                  <button type="button" className="px-4 py-2 bg-gray-200 text-green-900 rounded">
                    Cancel
                  </button>
                </DialogClose>
                <button type="submit" className="px-4 py-2 bg-green-900 text-white rounded">
                  Send Invite
                </button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>




      {/* Delete User Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogTrigger>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-800 text-white rounded flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
            <DialogTitle>  Are you sure you want to permanently remove this user?</DialogTitle>

            <DialogDescription>
              This will revoke their CRM access and unlink their meetings and records. Data created by the user (like leads or emails) will remain.

            </DialogDescription>
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 bg-gray-200 text-green-800 rounded">
                  Cancel
                </button>
              </DialogClose>
              <button
                onClick={handleDelete}
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Remove User
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>



      {/* Add Role Modal */}
      <Dialog >

        <DialogTrigger asChild>
          <button className="flex items-center gap-1 px-4 py-2 bg-green-900 text-white rounded">
            <Plus className="w-5 h-5" />
            Add  New Role
          </button>
        </DialogTrigger>
        <DialogContent className="role-dialog">
          <DialogHeader>
            <DialogTitle className="title">Add New Role</DialogTitle>
          </DialogHeader>

          <form className="role-form">
            <div className="form-group mb-4">
              <label>Role Name*</label>
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
              <div key={section} className="permission-section mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">{section}</h4>
                {Object.entries(items).map(([item, actions]) => (
                  <div key={item} className="permission-row flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800">{item}</div>
                    <div className="permission-actions flex gap-4 flex-wrap items-center">
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

            <div className="flex justify-end gap-2 mt-6 ">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 bg-gray-200 text-green-800 rounded margin-top">
                  Cancel
                </button>
              </DialogClose>
              <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded margin-top">
                Save
              </button>

            </div>
          </form>
        </DialogContent>
      </Dialog>




      {/* {Create Meetings} */}
      <Dialog>

        <DialogTrigger asChild>
          <button className="flex items-center gap-1 px-4 py-2 bg-green-900 text-white rounded">
            <Plus className="w-5 h-5" />
            Create Meeting
          </button>
        </DialogTrigger>
        <DialogContent className="meeting-dialog">
          <DialogHeader>
            <DialogTitle>Create Meeting</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="meeting-form">
            <label>
              Title*
              <input
                type="text"
                placeholder="Enter title of meeting"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <div className="datetime-row">
              <div>
                <label>From*</label>
                <div className="datetime-inputs">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                  <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label>To*</label>
                <div className="datetime-inputs">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                  <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="switch-row">
              <label>All day</label>
              <Switch checked={allDay} onCheckedChange={setAllDay} />
            </div>

            <label>
              Host*
              <select value={host} onChange={(e) => setHost(e.target.value)} required>
                <option>Dipanshu Singh</option>
                <option>Sandeep</option>
                <option>Akash Singh</option>
                <option>Other host </option>
              </select>
            </label>
            <label>Participants*

              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="add-link">+ Add Participants</button>
                </DialogTrigger>

                <DialogContent className="participant-dialog">
                  <DialogHeader>
                    <DialogTitle>Add Participants</DialogTitle>
                  </DialogHeader>

                  <div className="module-select-row">
                    <label>Select Module*</label>
                    <div className="dropdowns">
                      <select className="module-select">
                        <option>List</option>
                      </select>
                      <select className="module-select">
                        <option>Lead</option>
                      </select>
                    </div>
                  </div>

                  <div className="participant-list">
                    {participants.map((p, index) => (
                      <div
                        key={index}
                        className={`participant-item ${selectedParticipant === p.email ? 'selected' : ''}`}
                        onClick={() => setSelectedParticipant(p.email)}
                      >
                        <input
                          type="checkbox"
                          id={`participant-${index}`}
                          checked={selectedParticipant === p.email}
                          onChange={() => setSelectedParticipant(p.email)}
                        />
                        <label htmlFor={`participant-${index}`}>
                          {p.name}<br />
                          <small>{p.email}</small>
                        </label>
                      </div>
                    ))}
                  </div>

                  <label>
                    Invite BY Email Address
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </label>

                  <div className="action-row">
                    <DialogClose asChild>
                      <button type="button" className="submit-btn">Done</button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

            </label>

            <label>
              Description*
              <textarea
                maxLength={100}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Start typing the details about the meeting..."
                required
              />
              <div className="char-count">{description.length}/100</div>
            </label>

            <div className="reminder">
              <button type="button" className="add-link">+ Add Reminder</button>
            </div>

            <div className="form-actions">
              <DialogClose asChild>
                <button type="button" className="cancel-btn">Cancel</button>
              </DialogClose>
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>


      {/* {Manage Columns} */}

      <Dialog>

        <DialogTrigger asChild>
          <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-green-900 rounded">
            <Columns3Cog className="w-5 h-5" />
            Manage Column
          </button>
        </DialogTrigger>

        <DialogContent className="manage-col">
          <DialogHeader>
            <DialogTitle>Choose which columns you want to see.</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* Left: Column Options */}
            <div className="border rounded p-4 space-y-4 bg-white">
              <div>
                <p className="text-sm font-medium text-gray-600">Columns Options <span className="text-xs text-gray-400">(Choose columns to display)</span></p>
                <input type="text" placeholder="Search columns" className="mt-2 w-full border rounded px-2 py-1 text-sm" />
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700">Lead Info</h4>
                  <div className="space-y-1 mt-2">
                    <label><input type="checkbox" defaultChecked /> Name</label><br />
                    <label><input type="checkbox" defaultChecked /> Last Name</label><br />
                    <label><input type="checkbox" defaultChecked /> Email</label><br />
                    <label><input type="checkbox" defaultChecked /> Mobile Number</label><br />
                    <label><input type="checkbox" defaultChecked /> Contact Person</label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Address</h4>
                  <div className="space-y-1 mt-2">
                    <label><input type="checkbox" /> Street</label><br />
                    <label><input type="checkbox" /> City</label><br />
                    <label><input type="checkbox" /> District</label><br />
                    <label><input type="checkbox" /> State</label><br />
                    <label><input type="checkbox" /> Country</label>
                    <label><input type="checkbox" /> Zip code</label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">Company Name</h4>
                  <div className="space-y-1 mt-2">
                    <label><input type="checkbox" /> Job Title</label><br />
                    <label><input type="checkbox" /> Website</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selected Options */}
            <div className="border rounded p-4 bg-white space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">Selected Options
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">16</span> <span className="text-xs text-green-700">(Drag to reorder)</span></p>

              </div>

              <input type="text" placeholder="Search columns" className="w-full border rounded px-2 py-1 text-sm" />
              <input type="text bg-gray-300" placeholder="Lead Name" className="w-full border rounded px-2 py-1 text-md" />

              <div className="space-y-2">
                {[
                  "Name", "Last Name", "Contact Person", "Email", "Mobile number", "Amount",
                  "Company Name", "Position", "Billing Contact", "Due Date"
                ].map(item => (
                  <div key={item} className="flex items-center justify-between border px-3 py-2 rounded hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                      <span className="text-sm">{item}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <DialogFooter className="flex justify-between mt-6">

            <div className="text-sm text-gray-500 space-x-4">
              <button className="underline">Reset to default</button>
              <button className="text-gray-400 font-medium underline">Remove All columns</button>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 rounded border border-gray-300">Cancel</button>
              <button className="px-4 py-2 rounded bg-green-800 text-white">Apply</button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      {/* {Add Lead} */}

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
  );
}

export default Page
