
import React from "react";


export interface TableProps {
  columns: Array<{
    label: string;
    accessor: string;
    render?: (item?:any) => React.ReactNode;
  }>;
  data: any;
}

const Table = ({ columns, data }: TableProps) => {

  if (!data){
    return (
      <div className="flex justify-center items-center  w-full">
        <div className="spinner">

        </div>
      </div>
    )
  }

  return (
    <>
      <table className="table-auto w-full border-collapse border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b border-slate-200 dark:border-slate-600 font-medium text-left "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.results ? 
            data.results.map((row:any, index:number) => (
            <tr
              key={index}
              className="border-b border-slate-200 dark:border-slate-600 hover:bg-[#ebebeb] dark:hover:bg-slate-700 duration-200"
            >
              {columns.map((col, index) => (
                <td key={index} className="py-2 px-4 ">
                   {
                  // Check if render exists, if not, just render the value
                  col.render ? col.render(row) : row[col.accessor]
                }
                </td>
              ))}
            </tr>
          )):
            data.map((row:any, index:number) => (
              <tr
                key={index}
                className="border-b border-slate-200 dark:border-slate-600 hover:bg-[#ebebeb] dark:hover:bg-slate-700 duration-200"
              >
                {columns.map((col, index) => (
                  <td key={index} className="py-2 px-4 ">
                     {
                    // Check if render exists, if not, just render the value
                    col.render ? col.render(row) : row[col.accessor]
                  }
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>

    </>
  );
};

export default Table;
