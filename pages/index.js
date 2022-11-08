import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link'
import Image from 'next/image'
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() { // only runs server side
  const allPostsData = getSortedPostsData();
  console.log('allPostsData'); // this isn't reached
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className="title">
          Read <Link href="posts/first-post"> this page</Link>
          <Image
            src="/images/profile.jpg"
            width="144"
            height="144"
          ></Image>

          {/* <Image
  src="/images/profile.jpg" // Route of the image file
  height={144} // Desired size with correct aspect ratio
  width={144} // Desired size with correct aspect ratio
  alt="Your Name"
/> */}
        </h1>

        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}