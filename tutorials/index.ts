import e from 'express'
import tutorial_2_routes from './tutorial-2.ts'
import tutorial_3_routes from './tutorial-3.ts'
import tutorial_4_routes from './tutorial-4.ts'
import tutorial_5_routes from './tutorial-5.ts'
import tutorial_6_routes from './tutorial-6.ts'
import tutorial_7_routes from './tutorial-7.ts'
import tutorial_8_routes from './tutorial-8.ts'
import tutorial_9_routes from './tutorial-9.ts'
import tutorial_10_routes from './tutorial-10/index.ts'
import tutorial_12_routes from './tutorial-12.ts'

const tutorials_routes = e.Router()

tutorials_routes.use('/2', tutorial_2_routes)
tutorials_routes.use('/3', tutorial_3_routes)
tutorials_routes.use('/4', tutorial_4_routes)
tutorials_routes.use('/5', tutorial_5_routes)
tutorials_routes.use('/6', tutorial_6_routes)
tutorials_routes.use('/7', tutorial_7_routes)
tutorials_routes.use('/8', tutorial_8_routes)
tutorials_routes.use('/9', tutorial_9_routes)
tutorials_routes.use('/10', tutorial_10_routes)
tutorials_routes.use('/12', tutorial_12_routes)

export default tutorials_routes
