import React from 'react';
import MessagesWrapper from './Messages/Messages';
import DialogList from './DialogList/DialogList';
import { Switch, Route } from 'react-router-dom';
import NewChatForm from './NewChatForm/NewChatForm';

class Dialogs extends React.PureComponent {

    render() {
        return (
            <div className="dialogs">
                <Switch>
                    <Route exact path="/dialogs" render={() =>
                        <DialogList chats={this.props.chats} myId={this.props.myId} />
                    } />
                    <Route exact path="/dialogs/new" render={() =>
                        <NewChatForm />
                    } />
                    <Route exact path="/dialogs/:id" render={() =>
                        <MessagesWrapper
                            chats={this.props.chats}
                            messages={this.props.messages}
                            sendMessage={this.props.sendMessage}
                            myId={this.props.myId}
                        />
                    } />
                </Switch>
            </div>
        );
    }
}


export default Dialogs;