"use client"

import Image from "next/image"
import styles from "./page.module.css"
import { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs';
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";

import { useCompletion } from 'ai/react';

export default function Home() {
  const [schema, setSchema] = useState("");

  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: '/api/chat',
    body: {
      schema,
    },
  });

  let response = completion;

  return (
    <main className={styles.main}>
      <header>
      <Image
        src="/logo.svg"
        alt="Logo askSQL"
        width={118}
        height={27}
        priority
      />
      <button>
        <Image 
          src="/trash.svg"
          alt="Trash icon"
          width={32}
          height={32}
        />
      </button>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <p>Cole seu código SQL aqui</p>
          <div className={styles.schemaCode}>
            <Editor
              value={schema}
              onValueChange={schema => setSchema(schema)}
              highlight={schema => highlight(schema, languages.sql, 'sql')}
              padding={16}
              className={styles.editor}
            />
          </div>
        </div>

        <div>
          <p>Faça uma pergunta sobre o código</p>
          <textarea 
            name="question" 
            className={styles.question}
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.primaryButton}>
            <Image 
              src="/star.svg" 
              alt="star icon"
              width={24}
              height={24}
            />
            Perguntar à inteligência artificial
          </button>
        </div>

        <div>
          <p>Resposta</p>
          <div  className={styles.responseCode}>
            <Editor
              value={response}
              onValueChange={() => {}}
              highlight={response => highlight(response, languages.sql, 'sql')}
              padding={16}
              className={styles.editor}
              readOnly
            />
          </div>
        </div>
      </form>
    </main>
  )
}
