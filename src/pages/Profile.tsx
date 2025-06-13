import React from "react";
import TextInput from "../components/TextInput";

export default function Profile() {
  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr >
              <td className="px-8">Name</td>
              <td className="px-8">Store-api</td>
            </tr>
            <tr>
              <td className="px-8">Location</td>
              <td className="px-8">Silicon vallay</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form>
        <TextInput id="" />
      </form>
    </div>
  );
}
