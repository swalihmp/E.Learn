import React from 'react'
import { Input } from '@material-tailwind/react'
import { AiOutlineSend } from 'react-icons/ai'
import { useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

export default function Discussion() {
    const course_id = useParams()

    const [author, setAuthor] = useState('');
    const [activeRoomId, setActiveRoomId] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const socketRef = useRef(null);
    const scroll = useRef();

    useEffect(() => {
        const localResponse = getLocal('authToken');
        const decodedToken = jwtDecode(localResponse);
        setAuthor(decodedToken.user_id);

        axios
            .get(`${BASE_URL}chat/rooms/${course_id.id}`)
            .then((response) => {
            setActiveRoomId(response.data.id);


            })
            .catch((error) => {
            console.error('Error:', error);
            });

    }, []);

    useEffect(() => {
        socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${activeRoomId}/`);

        socketRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };




        axios
            .get(`${BASE_URL}chat/messages/${activeRoomId}`)
            .then((response1) => {
            setMessages(response1.data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });

        return () => {
            if (socketRef.current) {
              socketRef.current.close();
            }
          };
      }, [activeRoomId]);

      console.log(messages)
    const sendMessage = () =>{
        const message = {
            content : newMessage,
            author : author,
            room : activeRoomId,
        };
        axios
            .post(`${BASE_URL}chat/new_messages`, message)
            .then((response) => {
                const newMessage = response.data;
                setMessages(newMessage);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            if (socketRef.current) {
            socketRef.current.send(JSON.stringify(message));
            }

            setNewMessage('');
        };
        useEffect(() => {
            scroll.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages]);

  return (
    <div className='w-full font-poppins'>
        <div className="p-5 w-full h-full flex flex-col place-content-between">
            <div className="w-full overflow-y-scroll h-80 scrollbar-hide">
            {
                    messages?.map((dis,index)=>(
                    <div className={dis.author?.id===author ? 'flex flex-col w-full place-items-end' : 'flex flex-col w-full place-items-start'}>
                        <div className="w-2/5 h-32" key={index}>
                            <div className="w-full bg-secondary rounded-2xl rounded-tl-none p-3">
                                <h3 className='text-md font-normal'>{dis.content}</h3>
                            </div>
                            <div className="flex place-content-between p-1">
                                <p className='text-sm text-black'>{dis.author?.username}</p>
                                {/* <TimeAgo className='text-sm text-gray-600 ' date={dis.createdAt} /> */}
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
            <div className="w-full flex gap-2 place-items-center">
                <Input type='text' variant='static' value={newMessage}  placeholder='Discuss something...' onChange={e => setNewMessage(e.target.value)}/>
                <AiOutlineSend size={20} className=' cursor-pointer'  onClick={()=>{sendMessage()}}></AiOutlineSend>
            </div>
        </div>
    </div>
  )
}
