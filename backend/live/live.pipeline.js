export const singularPipeline = (ctx) => {
  let idx = 0
  const interval = setInterval(() => {
    ctx.send(`whisper ${idx}`)
    idx++
  }, 5000)
  return interval
}

export const broadcastPipeline = (clients) => {
  let idx = 0
  const interval = setInterval(() => {
    clients.forEach(c => {
      c.send(`broadcast ${idx}`)
    })
  }, 3000)
  return interval
}

export default {
  singularPipeline,
  broadcastPipeline
}