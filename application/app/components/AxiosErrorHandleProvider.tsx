'use client'
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type AxiosErrorHandleProviderProps = {
  children: React.ReactNode;
};

export const AxiosErrorHandleProvider: React.FC<AxiosErrorHandleProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('エラーが発生しました');
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleAxiosError = (error: AxiosError<any>) => { // errorの型をAxiosError<any>に変更
    setOpen(true);
    if (error.response && error.response.status !== 500) {
      setErrorMessage(error.response.data.error as string); // error.response.data.errorをstring型としてキャスト
    } else {
      setErrorMessage('エラーが発生しました');
    }
  };

  const handleNonAxiosError = (error: any) => { // 関数名をhandleNonAxiosErrorに変更
    setOpen(true);
    if (error.response.status === 401 || error.response.status === 403) {
      setErrorMessage(error.response.data.error as string);
    } else {
      setErrorMessage('エラーが発生しました');
    }
  };

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );

    const nonAxiosInterceptor = (error: any): void => { // 関数の型をvoidに変更
      handleNonAxiosError(error);
    };

    axios.interceptors.response.eject(axiosInterceptor); // 既存のaxiosインターセプターを削除

    // 新しい非axiosインターセプターを追加
    axios.interceptors.response.use(undefined, nonAxiosInterceptor);

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
      // axios.interceptors.response.eject(nonAxiosInterceptor); // nonAxiosInterceptorをejectする必要はないので削除するかコメントアウト
    };
  }, []);

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};