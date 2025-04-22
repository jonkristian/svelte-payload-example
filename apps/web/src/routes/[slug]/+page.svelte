<script lang="ts">
	import type { PageData } from './$types'

	const { data } = $props<{ data: PageData }>()

	function renderLexicalContent(content: any) {
		if (!content?.root?.children) return ''
		
		return content.root.children
			.map((node: any) => {
				if (node.type === 'paragraph') {
					const text = node.children
						.map((child: any) => child.text)
						.join('')
					return `<p>${text}</p>`
				}
				return ''
			})
			.join('')
	}

	const renderedContent = $derived(renderLexicalContent(data.page.content))
</script>

<svelte:head>
	<title>{data.page.meta?.title || data.page.title}</title>
	{#if data.page.meta?.description}
		<meta name="description" content={data.page.meta.description} />
	{/if}
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">{data.page.title}</h1>
	<div class="prose max-w-none">
		{@html renderedContent}
	</div>
</main>

<style>
	/* center the main using flexbox */
	main {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	div {
		margin: 1rem;
		text-align: center;
	}

	:global(body) {
		color: #fafbfc;
		background-color: #24292e;
	}

	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 2rem;
	}

	.content {
		line-height: 1.6;
	}
</style>
