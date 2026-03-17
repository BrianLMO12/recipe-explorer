import { useState } from 'react';
import { Search } from 'lucide-react';
import MagneticButton from './MagneticButton';
import '../styles/SearchBar.css';

export default function SearchBar({ onSearch, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          disabled={isLoading}
        />
        <MagneticButton
          type="submit"
          className="search-button"
          disabled={isLoading}
        >
          <Search size={20} />
        </MagneticButton>
      </div>
    </form>
  );
}
