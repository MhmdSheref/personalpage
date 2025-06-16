export default function Tags({tags}) {
    console.log(tags)
    return (

        <div className="tags">{tags.map(tag=>(<span key={tag}>#{tag}</span>))}</div>
    )
}