
import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'
import  Hero  from '@/components/Hero'



export default async function HomePage() {
  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
  })


  return (
   <main>
      <Hero hero={homePage?.hero ?? null}/>
   </main>
  )
}

