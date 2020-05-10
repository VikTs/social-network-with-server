import React, { useEffect, useState } from 'react';
import Messages from './Messages/MessagesContainer';
import DialogList from './DialogList/DialogListContainer';
import { Switch, Route, useHistory } from 'react-router-dom';
import NewChatForm from './NewChatForm/NewChatFormContainer';

const Dialogs = ({
    chats,
    myData,
    myId,
    friends,
    createChat,
    getMyData,
    getChats,
    setChats,
}) => {
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        async function getData() {
            getMyData();
            const gotChat = await getChats();
            setFilteredChats(gotChat);
        };

        getData();

        return function cleanup() {
            setFilteredChats([]);
            setChats(null);
        };
    }, []);

    return (
        <div className="dialogs">
            <Switch>
                <Route exact path="/dialogs" render={() =>
                    <DialogList
                        filteredChats={filteredChats}
                        setFilteredChats={setFilteredChats}
                    />
                } />
                <Route exact path="/dialogs/new" render={() =>
                    <NewChatForm
                        setFilteredChats={setFilteredChats}
                        filteredChats={filteredChats}
                    />
                } />
                <Route exact path="/dialogs/:id" render={() =>
                    <Messages
                        setFilteredChats={setFilteredChats}
                        filteredChats={filteredChats} />
                } />
            </Switch>
        </div>
    );
}

export default Dialogs;
