"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import livres from "../../../components/data/livre"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, BookOpen, Lock, AlertCircle } from "lucide-react"

const Livre = ({ params }) => {
  const router = useRouter()
  const livre = livres.find((livre) => livre.id === Number.parseInt(params.id))
  const [motDePasse, setMotDePasse] = useState("")
  const [autorisé, setAutorisé] = useState(false)
  const [erreur, setErreur] = useState("")
  const [loading, setLoading] = useState(false)

  if (!livre) {
    return (
      <div className="container  mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Livre non trouvé</CardTitle>
            <CardDescription>Le livre que vous recherchez n&apos;existe pas.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const vérifierMotDePasse = () => {
    setLoading(true)
    setErreur("")

    // Simuler un délai pour l'authentification
    setTimeout(() => {
      if (motDePasse === livre.motDePasse) {
        setAutorisé(true)
      } else {
        setErreur("Mot de passe incorrect. Veuillez réessayer.")
      }
      setLoading(false)
    }, 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      vérifierMotDePasse()
    }
  }

  if (!autorisé) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl text-center">Accès protégé</CardTitle>
            <CardDescription className="text-center text-[14px] text-black">
              Veuillez entrer le mot de passe reçu par mail pour accéder à &quot;{livre.titre}&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Entrez le mot de passe"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full"
                  autoFocus
                />
              </div>

              {erreur && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{erreur}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={vérifierMotDePasse} className="w-full" disabled={loading || !motDePasse}>
              {loading ? "Vérification..." : "Accéder au livre"}
            </Button>
            {/* <Button variant="outline" onClick={() => router.back()} className="w-full flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button> */}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        {/* <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button> */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">{livre.titre}</h1>
        </div>
       
      </div>

      <div className="w-full h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden">
        <iframe
          key={livre.id}
          src={livre.chemin}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title={livre.titre}
          loading="lazy"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}

export default Livre
