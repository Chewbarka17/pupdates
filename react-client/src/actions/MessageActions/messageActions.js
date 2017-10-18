const messageChange = (messages) => {
  return (dispatch) => {
    console.log('MESSAGE CHANGE DISPATCH: ', messages);
    dispatch({ type: 'MESSAGE_CHANGE', payload: messages });
  };
};

export default messageChange;
