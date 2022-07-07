const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bigIcon: {
    fontSize: 60,
    color: 'primary.main'
  },
  timeLeft: {
    fontSize: 60,
    color: 'error.main',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
};

export default styles;
