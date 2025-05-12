import React, { useState } from 'react';
import "../components/CreateNewList.css"
import { GripVertical } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import { CircleUser } from 'lucide-react';




import { X, UserPlus, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const PageOne = () => (


  <div className="create-new-list-form px-[32px] py-[20px]">
    <div className="create-new-list-form-header mb-4 font-semibold">
      Basic Info
    </div>
    <form className='space-y-4'>
      <div className="create-new-list-form-field">
        <label htmlFor="listname">List Name</label>
        <div className="custom-select-wrapper relative">
          <select required className='rounded-md w-full pr-10'>
            <option value="" disabled selected hidden>Enter list name</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
          </select>
          <div className="icons absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-1">
            <UserPlus />
            <ChevronDown />
          </div>
        </div>
      </div>

      <div className="create-new-list-form-field">
        <label htmlFor="description">Description</label>
        <textarea className='rounded-md w-full' name="description" id="description" />
      </div>
      <div className="create-new-list-form-field">
        <label htmlFor="listname">Pipeline Permission</label>
        <div className="custom-select-wrapper relative">
          <select required className='rounded-md w-full pr-10 mb-2'>
            <div className="pipeline-selected">
              <div className="pipeline-selected-item">
              </div>
            </div>
            <option value="" disabled selected hidden>Enter list name</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
          </select>
          <div className="icons absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-1">
            <ChevronDown />
          </div>
         
        </div>
        <div className="note">
          <span className='text-black font-bold'>
          Note :</span> Please select the roles to grant access to the Pipeline. Each role can have different permissions, including view access, status management, and editing capabilities. Ensure that you assign the appropriate roles to maintain system security and efficiency.
          </div>
      </div>
      <div className="create-new-list-form-field">
        <label className="block text-sm mb-2">Visibility</label>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center">
            <input type="radio" name="visibility" className="form-radio" />
            <span className="ml-2">Public (All Users)</span>
          </label>

          <label className="inline-flex items-center">
            <input type="radio" name="visibility" className="form-radio" defaultChecked />
            <span className="ml-2">Private (Only Assigned Users)</span>
          </label>

          <div className="bg-slate-200 py-[8px] px-[12px] rounded-md">
            <label htmlFor="users">Users</label>
            <div className="custom-select-wrapper relative">
              <select required className='rounded-md w-full pl-3 py-2.5 border'>
                <option value="" disabled selected hidden>Select Users</option>
                <option value="john">John</option>
                <option value="jane">Jane</option>
                <option value="doe">Doe</option>
              </select>
              <div className="icons absolute top-1/2 right-2 transform -translate-y-1/2">
                <ChevronDown />
              </div>
            </div>
          </div>

          <label className="inline-flex items-center">
            <input type="radio" name="visibility" className="form-radio" />
            <span className="ml-2">Team-Specific (Select Users)</span>
          </label>
        </div>
      </div>
    </form>
  </div>
);

const PageTwo = () => {
  const [stages, setStages] = useState([""]);

  const addStage = (index) => {
    const newStages = [...stages];
    newStages.splice(index + 1, 0, "");
    setStages(newStages);
  };

  const removeStage = (index) => {
    if (stages.length > 1) {
      setStages(stages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="px-[32px] py-[20px]">
      <div className="create-new-list-form-header mb-4 font-semibold">
        Stages
      </div>
      <div className="space-y-2">
        {stages.map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="drag-icon">
              <GripVertical />
            </div>
            <div className="stage-name px-4 py-[16.5px] rounded-md border w-4/5 flex items-center gap-2">
              <CircleUser />
              Name
            </div>
            <div className="flex gap-1">
              <Button onClick={() => removeStage(index)}>
                <Minus />
              </Button>
              <Button onClick={() => addStage(index)}>
                <Plus />
              </Button>
            </div>
          </div>
        ))}
        <Button variant="green" onClick={() => setStages([...stages, ""])}>
          Add Stage
        </Button>
      </div>
    </div>
  );
};

const PageThree = () => (
  <div className="create-new-list-form px-[32px] py-[20px]">
    <div className="create-new-list-form-header mb-4 font-semibold">
      Review and Confirm
    </div>
    <div className="bg-white rounded-md p-4 shadow-sm">
      <p><strong>List Name:</strong> Friends</p>
      <p><strong>Description:</strong> A list for friends and family.</p>
      <p><strong>Visibility:</strong> Private</p>
      <p><strong>Users:</strong> John, Jane</p>
      <p><strong>Roles:</strong> Viewer</p>
    </div>
  </div>
);

const CreateNewList = () => {
  const [pageno, setPageno] = useState(1);

  const renderPageContent = () => {
    switch (pageno) {
      case 1:
        return <PageOne />;
      case 2:
        return <PageTwo />;
      case 3:
        return <PageThree />;
      default:
        return <div>Invalid page</div>;
    }
  };

  const handleNext = () => setPageno(prev => Math.min(prev + 1, 3));
  const handlePrevious = () => setPageno(prev => Math.max(prev - 1, 1));

  return (
    <div className='create-new-list-wrapper  h-screen'>
      <div className="create-new-list  w-1/2 flex flex-col h-full justify-between p-4">
        <div className="create-new-list-top">
          <div className="create-new-list-header flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New List</h2>
            <X className="cursor-pointer" />
          </div>
          <div className="create-new-list-content">
            {renderPageContent()}
          </div>
        </div>

        <div className="create-new-list-bottom flex justify-between items-center mt-4">
          {/* Show Previous button only on page 2 and 3 */}
          {pageno > 1 ? (
            <Button variant="grey" onClick={handlePrevious}>Previous</Button>
          ) : (
            <div></div> // Placeholder for spacing
          )}

          <div className="flex gap-2">
            <Button variant="grey">Save</Button>
            <Button variant="green" onClick={handleNext} disabled={pageno === 3}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewList;
