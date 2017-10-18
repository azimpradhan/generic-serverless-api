import { hello } from '../../../src/api/hello/handler';

test('The default handler should work', () => {
  const event = {};
  const context = {};
  const callback = (ctx, data) => {
    console.log(data);
  };
  hello(event, context, callback);
});
