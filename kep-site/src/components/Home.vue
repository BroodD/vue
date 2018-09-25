<template>
  <v-container fluid>
		<v-layout row>
			<v-flex xs12>
				<h1>Home</h1>
				<vue-editor v-model="content"></vue-editor>
				<br>
				<br>
				<pre>{{ content }}</pre>
				<br>
				<br>
				<div v-html="content"></div>


				<br>
				<br>
				<tinymce id="d1" v-model="myModel" :other_options="options"></tinymce>
				<br>
				<br>
				<pre>{{ myModel }}</pre>
				<br>
				<br>
				<div v-html="myModel"></div>

			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
	// import { VueEditor } from 'vue2-editor'


	export default {

  //  components: {
	// 		VueEditor
  //  },

   data() {
       return {
         content: `<pre class="ql-syntax" spellcheck="false">// let vs var
(function () {
	// ...
})
</pre><h1><a href="https://github.com" target="_blank"><u>Heading 1 underline link</u></a></h1>`,
				myModel: `
<table style="border-collapse: collapse; width: 100%; height: 36px;" border="1">
<tbody>
<tr style="height: 18px;">
<th style="width: 20%; height: 18px;"><strong>Понеділок</strong></th>
<th style="width: 20%; height: 18px;">Вівторок</th>
<th style="width: 20%; height: 18px;">Середа</th>
<th style="width: 20%; height: 18px;">Четвер</th>
<th style="width: 20%; height: 18px;">П'ятниця</th>
</tr>
<tr style="height: 18px;">
<td style="width: 20%; height: 18px;">
<ol>
<li><strong>Хімія</strong> (1,3)</li>
</ol>
<h5 style="padding-left: 30px;">&nbsp; <em>Скочинська Р.Р&nbsp; ауд. 301</em></h5>
</td>
<td style="width: 20%; height: 18px;">&nbsp;</td>
<td style="width: 20%; height: 18px;">&nbsp;</td>
<td style="width: 20%; height: 18px;">&nbsp;</td>
<td style="width: 20%; height: 18px;">&nbsp;</td>
</tr>
</tbody>
</table>`,
				options: {
					language_url: '../static/langs/uk_UA.js' //This url points to location of persian language file.
				}
       }
     }
   }
 </script>

<style>
	textarea {
		width: 100%;
		max-width: 100%;
		resize: vertical;
	}
</style>
