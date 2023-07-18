import { useEffect, useRef, useState } from 'react';
import CarouselCustom from './Carusel';
import Img from '../img/click.png';

export default function Main() {
  const [data, setData] = useState('initial');
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const handleMessageFromNativeApp = (event) => {
      const messageData = event?.data;
      // Process the received message from the Android app
      console.log('Hello tash:', event);
      setData(messageData | 'dfdsfsd');
      // Update the component state or perform UI changes
    };
    // Add event listener to listen for messages from the native app
    window.addEventListener('message', handleMessageFromNativeApp);

    // Clean up the event listener when the component unmounts
  }, []);

  useEffect(() => {
    // Add event listener or callback to receive messages from iOS app
    window.addEventListener('message', handleReceivedData);

    // Clean up the event listener or callback
    return () => {
      window.removeEventListener('message', handleReceivedData);
    };
  }, []);

  const handleReceivedData = (event) => {
    const receivedData = event.data;
    // Handle the received data
    console.log('Hello tash:', receivedData);

    if (receivedData) setData(receivedData);
    // You can update state, display data in UI, or perform any other necessary actions
  };

  useEffect(() => {
    const button = document.getElementById('webButton');

    const handleClick = () => {
      window?.webkit?.messageHandlers?.buttonPressed.postMessage(
        'Button on the web page is pressed!'
      );
    };

    button.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      button.removeEventListener('click', handleClick);
    };
  }, []);

  const sendDataToiOSApp = () => {
    setIsMobile('iOS');
    const data = 'Hello Davronbek';
    window?.webkit?.messageHandlers?.dataHandler?.postMessage(data);
  };
  useEffect(() => {
    sendDataToiOSApp();
  }, []);

  const sendDataToAndroidApp = () => {
    setIsMobile('Android');

    const data = 'sanjar';
    window.postMessage(data);
  };

  // const sendDataToiOSApp = () => {
  //   const data = 'Hello Davronbek';
  //   window.webkit.messageHandlers.dataHandler.postMessage(data);
  // };
  return (
    <>
      <div className='h-56 sm:h-64 xl:h-80 2xl:h-96 p-5'>
        <CarouselCustom />
      </div>
      <div className='flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        {/* <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div> */}
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {`Received message from ${isMobile} app: ${data}`}
        </h1>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* <form className='space-y-6' action='#' method='POST'> */}
          {/* <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div> */}

          <div>
            <button
              onClick={() => {
                sendDataToAndroidApp();
              }}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              For Android
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                sendDataToiOSApp();
              }}
              id='webButton'
              className=' mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              For IOS
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                window.close();
              }}
              id='webButton'
              className=' mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Close
            </button>
          </div>
          {/* </form> */}

          <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?{' '}
            <a
              href='#'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
        {/* <video ref={videoRef} autoPlay></video> */}
      </div>
    </>
  );
}
