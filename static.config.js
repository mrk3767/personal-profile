import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'

import {
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'

const generateClassName = createGenerateClassName()

export default {
  siteRoot: 'https://www.kenworthy.io',
  paths: {
    dist: 'docs',
  },
  getSiteData: () => ({
    title: 'React Static',
  }),
  plugins: [
    [
      'react-static-plugin-jss',
      {
        providerProps: {
          generateClassName,
        },
      },
    ],
  ],
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    )
    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
}
