<h1>SwiftCourier Frontend</h1>
<p>The client-side dashboard for the SwiftCourier system.</p>

<h3> Deployment Status</h3>
<ul>
  <li><b>Platform:</b> Vercel</li>
  <li><b>Production URL:</b> <a href="courier-frontend-nine-henna.vercel.app">courier-frontend-nine-henna.vercel.app</a></li>
</ul>

<h3>🛠 Tech Stack</h3>
<ul>
  <li><b>Framework:</b> Next.js (App Router)</li>
  <li><b>Language:</b> TypeScript</li>
  <li><b>Styling:</b> Tailwind CSS</li>
</ul>

<h3>⚙️ Local Development</h3>
<ol>
  <li>Clone the repository and run <code>npm install</code>.</li>
  <li>Create a <code>.env.local</code> file in the root:</li>
</ol>
<pre>
NEXT_PUBLIC_API_URL=http://localhost:5000
</pre>
<p>3. Start the dev server: <code>npm run dev</code></p>

<h3>🌐 Production Configuration</h3>
<p>In the <b>Vercel Dashboard</b> (Settings > Environment Variables), ensure this is set:</p>
<ul>
  <li><b>Key:</b> <code>NEXT_PUBLIC_API_URL</code></li>
  <li><b>Value:</b> <code>https://courier-backend-rr5t.onrender.com</code></li>
</ul>

<hr>
<p><b>Founder:</b> Binayak Joshi | Full-Stack Developer</p>
