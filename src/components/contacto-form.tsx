"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappLink } from "@/lib/whatsapp";

export function ContactoForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = name.trim()
      ? `Hola, soy ${name.trim()}. ${message.trim()}`
      : message.trim();
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Tu nombre</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="María García"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Quería consultar sobre..."
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="rounded-sm transition hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100">
        Enviar por WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">
        Se abrirá WhatsApp con tu mensaje listo para enviar.
      </p>
    </form>
  );
}
