import Bar from "@/components/Bar"

export default function Home() {
  return (
    <div>
      <Bar
        title='满意度1'
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        style={{ width: '500px', height: '400px' }} />
      <Bar
        title='满意度2'
        xData={['react', 'vue', 'angular']}
        yData={[60, 70, 80]}
        style={{ width: '300px', height: '200px' }} />
    </div>
  )
}
