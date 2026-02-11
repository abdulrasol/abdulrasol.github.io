<script>
  import Navigation from '$lib/components/Navigation.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>AbdulRasol Al-Hilo — Software Engineer</title>
</svelte:head>

<Navigation />
<main>
  <Hero />
  <Skills />
  <Projects />
  <Contact />
</main>
<Footer />
