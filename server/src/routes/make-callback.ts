// make express callback function
function makeExpressCallback(controller) {
  return function (req, res) {
    const result = controller(req, res);
    if (result instanceof Promise) {
      result.then(() => {
        res.send();
      }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
    } else {
      res.send();
    }
  } 
}

export default makeExpressCallback;
