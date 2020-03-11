<script>
  export let segment;
</script>

<style>
  nav {
    background: var(--sec-gradient);
    color: var(--primary);
    height: 80px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }

  ul {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 auto;
    padding: 0;
  }

  li {
    display: block;
    width: 33.33%;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 80px;
    align-items: center;
    justify-content: center;
  }

  a {
    text-decoration: none;
    display: block;
    opacity: 0.55;
    position: relative;
    top: 4px;
  }

  a:last-child {
    position: relative;
    top: -4px;
  }

  .selected {
    position: relative;
    display: inline-block;
    opacity: 1;
    text-shadow: 0 0 5px white;
    font-weight: bolder;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">
        <img alt="vote" src="icons/vote.png" />
      </a>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>
    <li>
      <a class={segment === 'about' ? 'selected' : ''} href="about">
        <img alt="monitor" src="icons/donut.png" />
      </a>
      <a class={segment === 'about' ? 'selected' : ''} href="about">about</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class={segment === 'blog' ? 'selected' : ''}
        href="blog">
        <img alt="achievements" src="icons/trophy.png" />
      </a>
      <a
        rel="prefetch"
        class={segment === 'blog' ? 'selected' : ''}
        href="blog">
        blog
      </a>
    </li>
  </ul>
</nav>
