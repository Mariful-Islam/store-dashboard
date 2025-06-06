import React from 'react'
import TextInput from '../components/TextInput'

export default function Profile() {
  return (
    <div>
      <div>
        <div className='h-[150px] w-[150px] rounded-full '>

        </div>
        <table>
          <tr>
            <td className='px-8'>Name</td>
            <td className='px-8'>Store-api</td>
          </tr>
          <tr>
            <td className='px-8'>Location</td>
            <td className='px-8'>Silicon vallay</td>
          </tr>
        </table>
   
      </div>
      <form >
          <TextInput 
            id=''
          />
        </form>
    </div>
  )
}
