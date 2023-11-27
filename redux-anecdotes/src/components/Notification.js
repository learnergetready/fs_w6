const Notification = (message, color = 'green') => {
  const style = {
    border: 'solid',
    color: color,
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification