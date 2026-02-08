import { supabase } from '@/lib/superbase'
import QuestionSection from '@/app/components/QuestionSection'
import ImportantDatesSection from '@/app/components/ImportantDatesSection'
import SweetMessagesSection from '@/app/components/SweetMessagesSection'
import FutureMessagesSection from '@/app/components/FutureMessagesSection'

type ImportantDate = {
  id: number        
  type: string
  date: string      
  clasa: string
}

type FutureMessage = {
  id: number
  title: string
  content: string
  unlock_at: string
}

export default async function TempsPage() {
  const { data, error } = await supabase
    .from('important_dates')
    .select<'*', ImportantDate>()
    .order('date', { ascending: true })

  const { data: futureMessagesData, error: futureMessagesError } = await supabase
    .from('future_messages')
    .select<'*', FutureMessage>()
    .order('unlock_at', { ascending: true })

  if (error) {
    return (
      <main className="p-6 text-red-500">
        Erreur : {error.message}
      </main>
    )
  }

  return (
    <main className="w-full overflow-y-auto">
      <section id="hero" className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-transparent rounded-lg shadow-lg flex items-center justify-center">
          <img src="/happyVD.svg" alt="logo" className="w-full h-full object-cover rounded-lg" />
        </div>

        <QuestionSection />
      </section>

      <ImportantDatesSection dates={data || []} />

      <SweetMessagesSection />

      <FutureMessagesSection messages={futureMessagesData || []} />
    </main>
  )
}