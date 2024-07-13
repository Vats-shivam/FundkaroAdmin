import React from 'react'

const ProfileSurvey = () => {
  return (
    <div className='w-screen text-white h-screen bg-lightPrimary flex items-center justify-center'>
      <div className='  p-4 gap-4 flex flex-col items-center bg-darkPrimary '>
        <h2 className='text-xl '>Please fill this quick Form to access the dashboard</h2>
        <form action="" className='flex flex-col gap-2 w-[20rem]'>
          <label htmlFor="" className='text-lg font-semibold'>Have you taken a loan or purchased a product on EMI, or acquired a credit card</label>
          <select name="" id="" className='bg-gray-500 px-4 py-2'>
            <option value="yes">Yes</option>
            <option value="No">No</option>
          </select>
          <button className='px-4 py-2 bg-green-500 rounded-lg'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileSurvey