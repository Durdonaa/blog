import React from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import PaginacionTabla from "./paginationtable";

const BlogHome = props => (
  <div>
    <img src={props.home.data.image.url} alt="avatar image" />
    <h1>{RichText.asText(props.home.data.headline)}</h1>
    <p>{RichText.asText(props.home.data.description)}</p>
    <table className="table table-hover">
      <PaginacionTabla
        itemsperpage={5} //CHANGE TO DISPLAY MORE OR LESS ITEMS TO ONE PAGE
        nocolumns={true}
        items={props.posts.results}
        pagesspan={4}
      />
    </table>
  </div>
);

BlogHome.getInitialProps = async context => {
  const home = await client.getSingle("blog_home");
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );

  return { home, posts };
};

export default BlogHome;
