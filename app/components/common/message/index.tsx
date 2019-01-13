import { message } from 'antd';

const Message = (type: 'success' | 'error' | 'warning', content: string) => {
  switch (type) {
    case 'success':
      return message.success(content);
    case 'error':
      return message.error(content);
    default:
      return message.warning(content);
  }
};

export default Message;