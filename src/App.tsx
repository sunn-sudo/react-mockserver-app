/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const url = "http://localhost:5000";
  const options: AxiosRequestConfig = {
    url: `${url}/data`,
    method: "GET",
  };
  const [item, setItem] = useState<any>([]);
  const [status, setStatus] = useState<number | null>(null);

  //API通信を行う箇所
  useEffect(() => {
    axios(options)
      .then((res: AxiosResponse<[]>) => {
        const { data, status } = res;
        setItem(data);
        setStatus(status);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        // エラー処理
        console.log(e.message);
      }).finally(() => {
        if (status === 200 && item === undefined) {
          console.log("データがありません");
        }
      });
  }, []);

  const rows = item.map((data: any, index: number) =>
    <tr key={data}>
      <td>
        {index + 1}
      </td>
      <td>会員ID:{data.id}</td>
      <td>{data.name}</td>
      <td>{data.mail}</td>
    </tr>
  );

  return (
    <div className="App">
      <h1>Reactでmockサーバーを活用するぞ！</h1>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>MemberId</th>
            <th>name</th>
            <th>mail</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default App;
