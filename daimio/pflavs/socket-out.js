D.import_port_flavour('socket-out', {
  dir: 'out',
  outside_exit: function(ship) {
    if(socket)
      socket.emit('bounce', ship)
  }
})
