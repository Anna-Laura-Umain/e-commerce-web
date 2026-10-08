import {Checkbox} from '@/components/ui/checkbox'
import {Label} from '@/components/ui/label'

type FilterCheckboxProps = {
  id: string
  label: string
  checked: boolean
  onToggle: () => void
}

export function FilterCheckbox({id, label, checked, onToggle}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} className="cursor-pointer"  />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-stone-700">
        {label}
      </Label>
    </div>
  )
}