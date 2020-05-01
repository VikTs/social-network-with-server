import React from 'react';
import Messages from './Messages/Messages';
import DialogList from './DialogList/DialogList';
import { Switch, Route } from 'react-router-dom';
import NewChatForm from './NewChatForm/NewChatForm';

class Dialogs extends React.PureComponent {
    componentDidMount() {
        this.props.getMyData();
    }

    render() {
        return (
            <div className="dialogs">
                <Switch>
                    <Route exact path="/dialogs" render={() =>
                        <DialogList chats={this.props.chats} myId={this.props.myId} />
                    } />
                    <Route exact path="/dialogs/new" render={() =>
                        <NewChatForm
                            createChat={this.props.createChat}
                            myData={this.props.myData}
                            friends={this.props.friends}
                        />
                    } />
                    <Route exact path="/dialogs/:id" render={() =>
                        <Messages
                            chats={this.props.chats}
                            messages={this.props.messages || []}
                            sendMessage={this.props.sendMessage}
                            myId={this.props.myId}
                            friends={this.props.friends}
                            addNewChatMember={this.props.addNewChatMember}
                        />
                    } />
                </Switch>
            </div>
        );
    }
}


export default Dialogs;