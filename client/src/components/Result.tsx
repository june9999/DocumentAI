import axios from "axios";
import { useEffect, useState } from "react";

interface file {
  name: string;
  content: string;
}

const Result = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({ isloading: false, error: "" });

  useEffect(() => {
    setState({ isloading: true, error: "" });
    const getResult = async () => {
      axios
        .get(`${import.meta.env.VITE_LOCAL}files/api`)
        .then((res) => {
          setData(res.data);
          setState({ isloading: false, error: "" });
        })
        .catch((e) => {
          console.log(e);
          setState({ isloading: false, error: e });
        });
    };
    getResult();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                File name
              </th>
              <th scope="col" className="px-6 py-3">
                File content
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((e: file) => {
                return (
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"
                    key={e.name}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      {e.name}
                    </th>
                    <td className="px-6 py-4"> {e.content}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {state.isloading && <p className="p-[2rem]">Loading...</p>}
        {state.error && (
          <p className="p-[2rem]">Something wrong. Please try again later.</p>
        )}
      </div>
    </>
  );
};

export default Result;
